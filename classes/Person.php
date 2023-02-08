<?php

class Person
{
    private static $conn;
    public static function getConnection()
    {
        if (empty(self::$conn)) {
            $connection = parse_ini_file('config/books.ini');

            self::$conn = new PDO(
                "mysql:host={$connection['host']};port={$connection['port']};dbname={$connection['name']}",
                "{$connection['user']}",
                "{$connection['pass']}",
                [PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES UTF8']
            );

            self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        return self::$conn;
    }
    public static function save($person)
    {
        //abre conexão com MySQL e define o charset para utf8mb
        $conn = self::getConnection();

        if (empty($person['id'])) {
            $result = $conn->query("SELECT max(id) as next FROM people");
            $row = $result->fetch();

            $person['id'] = (int)$row['next'] + 1;

            $sql = "INSERT INTO people ( id, name, cep, address, district, phone, mail, city, state )
            VALUES (:id, :name, :cep, :address, :district, :phone, :mail, :city, :state)";
        } else {
            $sql = "UPDATE people SET name = :name, cep = :cep, address = :address, district = :district,
            phone = :phone, mail = :mail, city = :city, state = :state WHERE id = :id";
        }
        $result = $conn->prepare($sql);

        return $result->execute(
            [
                ':id' => $person['id'],
                ':name' => $person['name'],
                ':cep' => $person['cep'],
                ':address' => $person['address'],
                ':district' => $person['district'],
                ':phone' => $person['phone'],
                ':mail' => $person['mail'],
                ':city' => $person['city'],
                ':state' => $person['state']

            ]
        );
    }

    public static function find($id)
    {
        $conn = self::getConnection();

        $result = $conn->query("SELECT * FROM people WHERE id='{$id}'");
        return $result->fetch();
    }

    public static function delete($id)
    {
        $conn = self::getConnection();
        $result = $conn->query("DELETE FROM people WHERE id='{$id}'");

        return $result->fetch();
    }

    public static function all()
    {
        $conn = self::getConnection();

        $result = $conn->query("SELECT * FROM people");

        return $result;
    }
}
