package com.example.lab4_praca_domowa.controller;

import com.example.lab4_praca_domowa.dao.Person;
import com.example.lab4_praca_domowa.service.PersonService;
import com.example.lab4_praca_domowa.model.Greeting;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class Hello { //aka main

    private final ObjectMapper objectMapper;
    private final PersonService personService;

    @Autowired
    public Hello(ObjectMapper objectMapper, PersonService personService) {
        this.objectMapper = objectMapper;
        this.personService = personService;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> helloWorld(@RequestParam String name) {
        Greeting greeting = new Greeting("Czesc " + name);
        return wrapJsonResponse(greeting);
    }

    @GetMapping("/persons")
    public ResponseEntity<String> getPeople() {
        return wrapJsonResponse(personService.getPersons());
    }

    @GetMapping("/persons/{id}")
    public ResponseEntity<String> getPerson(@PathVariable Integer id) {
        return wrapJsonResponse(personService.getPerson(id));
    }

    @GetMapping("/persons/'{surname}'")
    public ResponseEntity<String> getPerson(@PathVariable String surname) {
        return wrapJsonResponse(personService.getPerson(surname));
    }

    @PostMapping("/create")
    public ResponseEntity<String> createPerson(@RequestParam String name, @RequestParam String surname, @RequestParam String job) {
        return wrapJsonResponse(personService.create(new Person(name, surname, job)));
    }

    private ResponseEntity<String> wrapJsonResponse(Object obj) {
        //helper
        try {
            String json = convertToJson(obj);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            return new ResponseEntity<String>(json, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("Blad przetwarzania", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    private String convertToJson(Object obj) throws JsonProcessingException {
        return objectMapper.writeValueAsString(obj);
    }
}