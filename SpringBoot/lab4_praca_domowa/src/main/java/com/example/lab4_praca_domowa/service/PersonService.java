package com.example.lab4_praca_domowa.service;

import com.example.lab4_praca_domowa.dao.Person;

import java.util.List;

public interface PersonService {
    public List<Person> getPersons();
    public Person getPerson(String surname);
    public Person create(Person person);
    public Person getPerson(Integer id);
}
