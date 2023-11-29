package com.example.lab4_praca_domowa.repository;

import com.example.lab4_praca_domowa.dao.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonsRepository extends CrudRepository<Person, Integer> {

}
