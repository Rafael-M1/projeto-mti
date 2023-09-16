package br.com.ficdev.apigoc.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.ficdev.apigoc.entities.Crime;

@Repository
public interface CrimeRepository extends JpaRepository<Crime, Long> {

	@Query("select c from Crime c where UPPER(c.descricao) like CONCAT('%', :descricao, '%') ")
	Page<Crime> findAllByDescricao(String descricao, Pageable pageable);

	@Query("select c from Crime c where c.status = true ")
	List<Crime> findAllAtivos();

}
