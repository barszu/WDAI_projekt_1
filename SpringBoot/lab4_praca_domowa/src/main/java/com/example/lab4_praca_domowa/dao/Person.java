package com.example.lab4_praca_domowa.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer id;
    public String name;
    public String surname;
    public String job;

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", job='" + job + '\'' +
                '}';
    }

    public Person(String name, String surname, String job) {
        this.name = name;
        this.surname = surname;
        this.job = job;
    }

    public Person(){};

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getJob() {
        return job;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setJob(String job) {
        this.job = job;
    }


}