package br.com.ficdev.apigoc.services;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.ficdev.apigoc.dto.OcorrenciaDTO;
import br.com.ficdev.apigoc.entities.Ocorrencia;
import br.com.ficdev.apigoc.repositories.OcorrenciaRepository;
import br.com.ficdev.apigoc.services.exceptions.DatabaseException;
import br.com.ficdev.apigoc.services.exceptions.ResourceNotFoundException;

@Service
public class OcorrenciaService {

	@Autowired
	private OcorrenciaRepository repository;

	@Transactional(readOnly = true)
	public Page<OcorrenciaDTO> findAllPaged(Pageable pageable) {
		Page<Ocorrencia> page = repository.findAll(pageable);
		Page<OcorrenciaDTO> pageDto = page.map(OcorrenciaDTO::new);
		return pageDto;
	}

	@Transactional(readOnly = true)
	public OcorrenciaDTO findById(Long idOcorrencia) {
		Optional<Ocorrencia> obj = repository.findById(idOcorrencia);
		Ocorrencia entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		OcorrenciaDTO ocorrenciaDTO = new OcorrenciaDTO(entity);
		return ocorrenciaDTO;
	}

	@Transactional
	public Ocorrencia insert(Ocorrencia ocorrencia) {
		ocorrencia.setStatus(true);
		ocorrencia.setDataCriado(LocalDateTime.now());
		ocorrencia = repository.save(ocorrencia);
		return ocorrencia;
	}

	@Transactional
	public Ocorrencia update(Long idOcorrencia, Ocorrencia ocorrencia) {
		try {
			Ocorrencia ocorrenciaSaved = repository.getOne(idOcorrencia);
			//TODO acrescentar todos atributos para ser atualizados;
			ocorrenciaSaved.setBairro(ocorrencia.getBairro());
			ocorrenciaSaved.setStatus(ocorrencia.isStatus());
			ocorrenciaSaved = repository.save(ocorrenciaSaved);
			return ocorrenciaSaved;
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + idOcorrencia);
		}		
	}

	public void delete(Long idOcorrencia) {
		try {
			repository.deleteById(idOcorrencia);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + idOcorrencia);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
}
