package br.com.ficdev.apigoc.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.ficdev.apigoc.entities.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
	
	@Query("select p from Pessoa p where p.cpf = :cpf ")
	Optional<Pessoa> findPessoaByCPF(String cpf);

	@Query("select p from Pessoa p where UPPER(p.nome) like CONCAT('%', UPPER(:nome), '%') ")
	Page<Pessoa> findByFiltro(String nome, Pageable pageable);
}
