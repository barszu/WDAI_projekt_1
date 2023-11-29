package com.example.lab4_praca_domowa.service;

import com.example.lab4_praca_domowa.dao.Person;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.lab4_praca_domowa.repository.PersonsRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class PersonServiceImpl implements PersonService {
    private final Logger log = LoggerFactory.getLogger(PersonServiceImpl.class);
    private final PersonsRepository personsRepository;

    @Autowired
    public PersonServiceImpl(PersonsRepository repo) {
        this.personsRepository = repo;
    }

    @Bean
    public CommandLineRunner loadDummyData(PersonsRepository repository) {
        return (args) -> {
            repository.save(new Person("John", "Doe","IT"));
            repository.save(new Person("John", "Smith","tester"));
            repository.save(new Person("Andrzej", "Bomba","bezrobocie"));
            repository.save(new Person("Blazej", "Blazejowski","krol"));
            repository.save(new Person("Tytus", "Bomba","zolnierz"));
            repository.save(new Person("Bogdan", "Boner","egzorcysta"));
            // fetch all customers
            log.info("Customers found with findAll():");
            log.info("-------------------------------");
            repository.findAll().forEach(customer -> {
                log.info(customer.toString());
            });
        };
    }




    @Override
    public List<Person> getPersons() {
        return (List<Person>) personsRepository.findAll();
    }

    @Override
    public Person getPerson(Integer id) {
        return personsRepository.findById(id).orElse(null);
    }

    @Override
    public Person create(Person person) {
        return personsRepository.save(person);
    }

    @Override
    public Person getPerson(String surname) {
        List<Person> people = getPersons();
        for (Person person: people) {
            if (person.surname.equals(surname)) {
                return person;
            }
        }
        return null;
    }
}
