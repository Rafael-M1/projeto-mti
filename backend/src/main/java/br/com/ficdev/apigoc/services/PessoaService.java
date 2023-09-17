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

import br.com.ficdev.apigoc.entities.Pessoa;
import br.com.ficdev.apigoc.repositories.PessoaRepository;
import br.com.ficdev.apigoc.services.exceptions.DatabaseException;
import br.com.ficdev.apigoc.services.exceptions.ResourceNotFoundException;

@Service
public class PessoaService {
	
	@Autowired
	private PessoaRepository repository;
	
	@Transactional(readOnly = true)
	public Page<Pessoa> findAllPaged(Pageable pageable) {
		Page<Pessoa> page = repository.findAll(pageable);
		return page;
	}

	@Transactional(readOnly = true)
	public Pessoa findById(Long id) {
		Optional<Pessoa> obj = repository.findById(id);
		Pessoa pessoa = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return pessoa;
	}
	
	@Transactional(readOnly = true)
	public Pessoa findByCPF(String cpf) {
		if (cpf.length() == 11) {			
			Optional<Pessoa> obj = repository.findPessoaByCPF(cpf);
			Pessoa pessoa = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
			return pessoa;
		}
		throw new IllegalArgumentException("CPF inválido");
	}

	@Transactional
	public Pessoa insert(Pessoa pessoa) {
		pessoa = repository.save(pessoa);
		return pessoa;
	}

	@Transactional
	public Pessoa update(Long id, Pessoa pessoa) {
		try {
			Pessoa pessoaSaved = repository.getOne(id);
			pessoaSaved.setDataNascimento(pessoa.getDataNascimento());
			pessoaSaved.setEmail(pessoa.getEmail());
			pessoaSaved.setNome(pessoa.getNome());
			pessoaSaved.setSexo(pessoa.getSexo());
			pessoaSaved.setTelefone1(pessoa.getTelefone1());
			pessoaSaved.setTelefone2(pessoa.getTelefone2());
			pessoaSaved = repository.save(pessoaSaved);
			return pessoaSaved;
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
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

	public Page<Pessoa> findByFiltro(String nome, Pageable pageable) {
		Page<Pessoa> page = repository.findByFiltro(nome, pageable);
		return page;
	}
}
