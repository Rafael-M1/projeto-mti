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

import br.com.ficdev.apigoc.entities.Crime;
import br.com.ficdev.apigoc.services.CrimeService;

@RestController
@RequestMapping(value = "/crime")
public class CrimeResource {

	@Autowired
	private CrimeService service;
	
	@GetMapping
	public ResponseEntity<Page<Crime>> findAll(Pageable pageable) {
		Page<Crime> list = service.findAllPaged(pageable);		
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{idCrime}")
	public ResponseEntity<Crime> findById(@PathVariable Long idCrime) {
		Crime crime = service.findById(idCrime);
		return ResponseEntity.ok().body(crime);
	}
	
	@PostMapping
	public ResponseEntity<Crime> insert(@RequestBody Crime crime) {
		crime = service.insert(crime);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{idCrime}")
				.buildAndExpand(crime.getIdCrime()).toUri();
		return ResponseEntity.created(uri).body(crime);
	}

	@PutMapping(value = "/{idCrime}")
	public ResponseEntity<Crime> update(@PathVariable Long idCrime, @RequestBody Crime crime) {
		crime = service.update(idCrime, crime);
		return ResponseEntity.ok().body(crime);
	}

	@DeleteMapping(value = "/{idCrime}")
	public ResponseEntity<Void> delete(@PathVariable Long idCrime) {
		service.delete(idCrime);
		return ResponseEntity.noContent().build();
	}
} 
