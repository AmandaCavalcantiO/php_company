<?php

require_once __DIR__ . '/classes/Person.php';

class PersonList
{
    private $html;

    public function __construct()
    {
        $this->html = file_get_contents(__DIR__ . '/html/list.html');
    }

    public function delete($param)
    {
        $output  = sprintf('<script>%s</script>', "console.log('anabda ')");

        echo $output;
        try {
            $id = (int)$param['id'];
            Person::delete($id);
        } catch (Exception $e) {
            print $e->getMessage();
        }
    }

    public function load()
    {

        try {
            $rows = '';
            foreach (Person::all() as $person) {
                $row = file_get_contents(__DIR__ . '/html/row.html');

                $row = str_replace(['{id}', '{name}', '{address}', '{district}', '{phone}', '{mail}'], [$person['id'], $person['name'], $person['address'], $person['district'], $person['phone'], $person['mail']], $row);
                $rows .= $row;
            }
            $this->html = str_replace('{rows}', $rows, $this->html);
        } catch (Exception $e) {
            print $e->getMessage();
        }
    }

    public function show()
    {
        $this->load();
        print $this->html;
    }
}
