package br.com.ficdev.apigoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ficdev.apigoc.entities.Envolvido;

@Repository
public interface EnvolvidoRepository extends JpaRepository<Envolvido, Long> {

}
