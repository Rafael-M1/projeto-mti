package br.com.ficdev.apigoc.repositories;

import java.time.LocalDateTime;

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
	
	//Consultas Dashboard
	@Query("select COUNT(*) from Ocorrencia o "
			+ "where o.status = true "
			+ "and ((o.dataOcorrencia < :dataFim and o.dataOcorrencia > :dataInicio) or (cast(:dataInicio as date) IS NULL and cast(:dataFim as date) IS NULL)  )")
	Long findOcorrenciasPorPeriodo(LocalDateTime dataInicio, LocalDateTime dataFim);

	@Query("select COUNT(*) from Ocorrencia o "
			+ "where o.status = true "
			+ "and ((o.dataOcorrencia < :dataFim and o.dataOcorrencia > :dataInicio) or (cast(:dataInicio as date) IS NULL and cast(:dataFim as date) IS NULL)  )"
			+ "and o.vitima.sexo = 'F' ")
	Long findOcorrenciasMulheresPorPeriodo(LocalDateTime dataInicio, LocalDateTime dataFim);

	@Query("select COUNT(*) from Ocorrencia o "
			+ "where o.status = true "
			+ "and ((o.dataOcorrencia < :dataFim and o.dataOcorrencia > :dataInicio) or (cast(:dataInicio as date) IS NULL and cast(:dataFim as date) IS NULL)  )"
			+ "and o.vitima.sexo = 'M' ") //
	Long findOcorrenciasHomensPorPeriodo(LocalDateTime dataInicio, LocalDateTime dataFim);
}





