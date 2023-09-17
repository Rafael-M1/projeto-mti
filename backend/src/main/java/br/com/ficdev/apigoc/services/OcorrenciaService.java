package br.com.ficdev.apigoc.services;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.ficdev.apigoc.dto.EnvolvidoDTO;
import br.com.ficdev.apigoc.dto.OcorrenciaCrimeDTO;
import br.com.ficdev.apigoc.dto.OcorrenciaDTO;
import br.com.ficdev.apigoc.dto.OcorrenciaInsertDTO;
import br.com.ficdev.apigoc.entities.Crime;
import br.com.ficdev.apigoc.entities.Envolvido;
import br.com.ficdev.apigoc.entities.Ocorrencia;
import br.com.ficdev.apigoc.entities.OcorrenciaCrime;
import br.com.ficdev.apigoc.entities.Pessoa;
import br.com.ficdev.apigoc.entities.Usuario;
import br.com.ficdev.apigoc.entities.compositekeys.OcorrenciaCrimeId;
import br.com.ficdev.apigoc.entities.filters.OcorrenciaFiltro;
import br.com.ficdev.apigoc.repositories.EnvolvidoRepository;
import br.com.ficdev.apigoc.repositories.OcorrenciaCrimeRepository;
import br.com.ficdev.apigoc.repositories.OcorrenciaRepository;
import br.com.ficdev.apigoc.repositories.PessoaRepository;
import br.com.ficdev.apigoc.services.exceptions.ResourceNotFoundException;

@Service
public class OcorrenciaService {

	@Autowired
	private OcorrenciaRepository repository;

	@Autowired
	private OcorrenciaCrimeRepository ocorrenciaCrimeRepository;

	@Autowired
	private EnvolvidoRepository envolvidoRepository;

	@Autowired
	private PessoaRepository pessoaRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private CrimeService crimeService;

	@Transactional(readOnly = true)
	public Page<OcorrenciaDTO> findAllPagedAtivos(Pageable pageable) {
		Page<Ocorrencia> page = repository.findAllAtivos(pageable);
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
	public Ocorrencia insert(OcorrenciaInsertDTO ocorrenciaInsertDTO) {
		Ocorrencia ocorrencia = new Ocorrencia();
		ocorrencia.setBairro(ocorrenciaInsertDTO.getBairro());
		ocorrencia.setCidade(ocorrenciaInsertDTO.getCidade());
		ocorrencia.setComplemento(ocorrenciaInsertDTO.getComplemento());
		ocorrencia.setDataCriado(LocalDateTime.now());
		ocorrencia.setDataOcorrencia(ocorrenciaInsertDTO.getDataOcorrencia());
		ocorrencia.setDescricaoGeral(ocorrenciaInsertDTO.getDescricaoGeral());
		ocorrencia.setEndereco(ocorrenciaInsertDTO.getEndereco());
		ocorrencia.setNumero(ocorrenciaInsertDTO.getNumero());
		Usuario operador = userService.findUsuarioById(ocorrenciaInsertDTO.getIdOperador());
		ocorrencia.setOperador(operador);
		ocorrencia.setStatus(true);

		// Verifica se Pessoa vitima ja existe no DB
		Optional<Pessoa> vitimaOptional = pessoaRepository.findPessoaByCPF(ocorrenciaInsertDTO.getVitima().getCpf());
		if (vitimaOptional.isPresent()) {
			ocorrencia.setVitima(vitimaOptional.get());
		} else {
			Pessoa vitima = ocorrenciaInsertDTO.getVitima();
			vitima = pessoaRepository.save(vitima);
			ocorrencia.setVitima(vitima);
		}

		ocorrencia = repository.save(ocorrencia);
		for (OcorrenciaCrimeDTO ocorrenciaCrimeDTO : ocorrenciaInsertDTO.getCrimesEnvolvidos()) {
			OcorrenciaCrime oc1 = new OcorrenciaCrime();
			Crime crime = crimeService.findById(ocorrenciaCrimeDTO.getIdCrime());
			OcorrenciaCrimeId oci1 = new OcorrenciaCrimeId(ocorrencia.getIdOcorrencia(), crime.getIdCrime());
			oc1.setIdOcorrenciaCrime(oci1);
			oc1.setCrime(crime);
			oc1.setOcorrencia(ocorrencia);
			oc1.setDescricaoCrimeOcorrencia(ocorrenciaCrimeDTO.getDescricaoCrimeOcorrencia());
			ocorrenciaCrimeRepository.save(oc1);
			ocorrencia.addOcorrenciaCrime(oc1);

		}
		for (EnvolvidoDTO envolvidoDTO : ocorrenciaInsertDTO.getPessoasEnvolvidas()) {
			Envolvido envolvido = new Envolvido();
			envolvido.setDescricao(envolvidoDTO.getDescricao());
			envolvido.setOcorrencia(ocorrencia);
			envolvido.setPessoa(envolvidoDTO.getPessoa());
			envolvidoRepository.save(envolvido);
			ocorrencia.addEnvolvido(envolvido);
		}
		return ocorrencia;
	}

	@Transactional
	public Ocorrencia update(Long idOcorrencia, Ocorrencia ocorrencia) {
		try {
			Ocorrencia ocorrenciaSaved = repository.getOne(idOcorrencia);
			// TODO acrescentar todos atributos para ser atualizados;
			ocorrenciaSaved.setBairro(ocorrencia.getBairro());
			ocorrenciaSaved.setStatus(ocorrencia.isStatus());
			ocorrenciaSaved = repository.save(ocorrenciaSaved);
			return ocorrenciaSaved;
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + idOcorrencia);
		}
	}

	public void delete(Long idOcorrencia) {
		try {
			Ocorrencia ocorrencia = repository.findById(idOcorrencia).get();
			ocorrencia.setStatus(false);
			repository.save(ocorrencia);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + idOcorrencia);
		}
	}

	@Transactional
	public Page<OcorrenciaDTO> findByFiltro(OcorrenciaFiltro ocorrenciaFiltro, Pageable pageable) {
		Long idOcorrenciaFiltro = null;
		try {
			idOcorrenciaFiltro = (ocorrenciaFiltro != null && ocorrenciaFiltro.getFiltroTexto() != null)
					? Long.parseLong(ocorrenciaFiltro.getFiltroTexto())
					: null;
			ocorrenciaFiltro.setFiltroTexto(null);
		} catch (NumberFormatException e) {
			idOcorrenciaFiltro = null;
		}
		Page<Ocorrencia> page = repository.findByFiltro(idOcorrenciaFiltro, ocorrenciaFiltro.getFiltroTexto(),
				pageable);
		Page<OcorrenciaDTO> pageDto = page.map(OcorrenciaDTO::new);
		return pageDto;
	}

}
