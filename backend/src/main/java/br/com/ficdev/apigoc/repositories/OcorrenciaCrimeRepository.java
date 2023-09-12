package br.com.ficdev.apigoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ficdev.apigoc.entities.OcorrenciaCrime;

@Repository
public interface OcorrenciaCrimeRepository extends JpaRepository<OcorrenciaCrime, Long> {

}
