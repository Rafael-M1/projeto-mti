package br.com.ficdev.apigoc.resources;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.ficdev.apigoc.entities.Pessoa;
import br.com.ficdev.apigoc.services.PessoaService;

@RestController
@RequestMapping(value = "/pessoa")
public class PessoaResource {

	@Autowired
	private PessoaService service;
	
	@GetMapping
	public ResponseEntity<Page<Pessoa>> findAll(Pageable pageable) {
		Page<Pessoa> list = service.findAllPaged(pageable);		
		return ResponseEntity.ok().body(list);
	}
	
	@PostMapping("/filtro")
	public ResponseEntity<Page<Pessoa>> findByFiltro(@RequestBody Pessoa pessoa, Pageable pageable) {
		Page<Pessoa> page = service.findByFiltro(pessoa.getNome(), pageable);
		return ResponseEntity.ok().body(page);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Pessoa> findById(@PathVariable Long id) {
		Pessoa pessoa = service.findById(id);
		return ResponseEntity.ok().body(pessoa);
	}
	
	@GetMapping(value = "/cpf/{cpf}")
	public ResponseEntity<Pessoa> findByCPF(@PathVariable String cpf) {
		Pessoa pessoa = service.findByCPF(cpf);
		return ResponseEntity.ok().body(pessoa);
	}
	
	@PostMapping
	public ResponseEntity<Pessoa> insert(@RequestBody Pessoa pessoa) {
		pessoa = service.insert(pessoa);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(pessoa.getIdPessoa()).toUri();
		return ResponseEntity.created(uri).body(pessoa);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Pessoa> update(@PathVariable Long id, @RequestBody Pessoa pessoa) {
		Pessoa pessoaSaved = service.update(id, pessoa);
		return ResponseEntity.ok().body(pessoaSaved);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
} 
