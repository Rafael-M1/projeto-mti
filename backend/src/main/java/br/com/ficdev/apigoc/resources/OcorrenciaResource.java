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

import br.com.ficdev.apigoc.dto.OcorrenciaDTO;
import br.com.ficdev.apigoc.entities.Ocorrencia;
import br.com.ficdev.apigoc.services.OcorrenciaService;

@RestController
@RequestMapping(value = "/ocorrencia")
public class OcorrenciaResource {

	@Autowired
	private OcorrenciaService service;
	
	@GetMapping
	public ResponseEntity<Page<OcorrenciaDTO>> findAll(Pageable pageable) {
		Page<OcorrenciaDTO> list = service.findAllPaged(pageable);		
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{idOcorrencia}")
	public ResponseEntity<Ocorrencia> findById(@PathVariable Long idOcorrencia) {
		Ocorrencia ocorrencia = service.findById(idOcorrencia);
		return ResponseEntity.ok().body(ocorrencia);
	}
	
	@PostMapping
	public ResponseEntity<Ocorrencia> insert(@RequestBody Ocorrencia ocorrencia) {
		ocorrencia = service.insert(ocorrencia);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{idCrime}")
				.buildAndExpand(ocorrencia.getIdOcorrencia()).toUri();
		return ResponseEntity.created(uri).body(ocorrencia);
	}
	
	@PutMapping(value = "/{idOcorrencia}")
	public ResponseEntity<Ocorrencia> update(@PathVariable Long idOcorrencia, @RequestBody Ocorrencia ocorrencia) {
		ocorrencia = service.update(idOcorrencia, ocorrencia);
		return ResponseEntity.ok().body(ocorrencia);
	}

	@DeleteMapping(value = "/{idOcorrencia}")
	public ResponseEntity<Void> delete(@PathVariable Long idOcorrencia) {
		service.delete(idOcorrencia);
		return ResponseEntity.noContent().build();
	}
} 
