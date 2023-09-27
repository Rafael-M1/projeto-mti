package br.com.ficdev.apigoc.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.ficdev.apigoc.entities.Crime;
import br.com.ficdev.apigoc.repositories.CrimeRepository;
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

	public void delete(Long idCrime) {
		try {
			Crime crime = repository.findById(idCrime).get();
			crime.setStatus(!crime.isStatus());
			repository.save(crime);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + idCrime);
		}
	}

	@Transactional(readOnly = true)
	public Page<Crime> findAllPagedByDescricao(String descricao, Pageable pageable) {
		Page<Crime> list = repository.findAllByDescricao(descricao.toUpperCase(), pageable);
		return list;
	}

	public List<Crime> findAllAtivos() {
		return repository.findAllAtivos();
	}
}
