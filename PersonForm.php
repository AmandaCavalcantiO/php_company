<?php

require_once __DIR__ . '/classes/Person.php';

class PersonForm
{
    private $html;
    private $data;

    public function __construct()
    {
        $this->html = file_get_contents('html/form.html');

        $this->data = [
            'id' => null,
            'name' => null,
            'cep' => null,
            'address' => null,
            'district' => null,
            'phone' => null,
            'mail' => null,
            'city' => null,
            'state' => null
        ];
    }

    public function edit($param)
    {
        try {
            $id = (int)$param['id'];
            $person = Person::find($id);
            $this->data = $person;
        } catch (Exception $e) {
            print $e->getMessage();
        }
    }

    public function save($params)
    {
        try {
            Person::save($params);
            $this->data = $params;
            print "<div class= 'trigger-sucess center'> <p> Pessoa salva com Sucesso! </p> </div>";
        } catch (Exception $e) {
            print $e->getMessage();
        }
    }

    public function show()
    {
        $search = ['{id}', '{name}','{cep}','{address}','{district}','{phone}', '{mail}', '{city}', '{state}'];
        $replace = [$this->data['id'],$this->data['name'],  $this->data['cep'], $this->data['address'], $this->data['district'], $this->data['phone'], $this->data['mail'], $this->data['city'],$this->data['state']];

        $this->html = str_replace($search, $replace, $this->html);
        print $this->html;
    }
}
// [$this->data['id'],$this->data['name'],  $this->data['cep'], $this->data['district'], $this->data['phone'], $this->data['mail'], $this->data['city'],$this->data['state'], $this->data['address']]
