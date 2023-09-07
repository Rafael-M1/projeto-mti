package br.com.ficdev.apigoc.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.ficdev.apigoc.entities.Crime;
import br.com.ficdev.apigoc.repositories.CrimeRepository;
import br.com.ficdev.apigoc.services.exceptions.DatabaseException;
import br.com.ficdev.apigoc.services.exceptions.ResourceNotFoundException;

@Service
public class CrimeService {

	@Autowired
	private CrimeRepository repository;
	
	@Transactional(readOnly = true)
	public Page<Crime> findAllPaged(Pageable pageable) {
		Page<Crime> list = repository.findAll(pageable);
		return list;
	}

	@Transactional(readOnly = true)
	public Crime findById(Long idCrime) {
		Optional<Crime> obj = repository.findById(idCrime);
		Crime entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return entity;
	}

	@Transactional
	public Crime insert(Crime crime) {
		crime.setStatus(true);
		crime = repository.save(crime);
		return crime;
	}

	@Transactional
	public Crime update(Long idCrime, Crime crime) {
		try {
			Crime crimeSaved = repository.getOne(idCrime);
			crimeSaved.setDescricao(crime.getDescricao());
			crimeSaved.setStatus(crime.isStatus());
			crimeSaved = repository.save(crimeSaved);
			return crimeSaved;
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + idCrime);
		}		
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
}