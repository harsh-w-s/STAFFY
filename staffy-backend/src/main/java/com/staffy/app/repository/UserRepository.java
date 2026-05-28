package com.staffy.app.repository;

import com.staffy.app.model.Role;
import com.staffy.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    List<User> findByManagerId(Long managerId);

    List<User> findByRole(Role role);
}

/*
JpaRepository => Interface in spring boot that makes working with relational dbs very easy. Built on top of JPA and provides all the basic CRUD methods

Note: JPA => A java specification for managing relational databases in applications. It provides an Object Relational Mapping(ORM) standard.
Note: JPA is a standard or a specification, not a tool itself. Its popular implementations are Hibernate, OpenJPA, EclipseLink.

Note: Persistence in java refers to the mechanism of storing and retrieving data from db such that it survives the lifecycle of application process
 */
