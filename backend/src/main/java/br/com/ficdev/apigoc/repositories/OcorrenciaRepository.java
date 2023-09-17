package br.com.ficdev.apigoc.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.ficdev.apigoc.entities.Ocorrencia;

@Repository
public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {

	@Query("select o from Ocorrencia o where o.status = true ")
	Page<Ocorrencia> findAllAtivos(Pageable pageable);

	@Query("select o from Ocorrencia o where o.status = true "
			+ "and ("
			+ "(o.idOcorrencia = :idOcorrenciaFiltro or :idOcorrenciaFiltro is null) "
				+ "AND "
				+ "(UPPER(o.vitima.nome) like CONCAT('%', UPPER(:filtroTexto), '%') or :filtroTexto is null) )")
	Page<Ocorrencia> findByFiltro(Long idOcorrenciaFiltro, String filtroTexto, Pageable pageable);
}
