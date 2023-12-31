package br.com.ficdev.apigoc.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.ficdev.apigoc.dto.RoleDTO;
import br.com.ficdev.apigoc.dto.UserDTO;
import br.com.ficdev.apigoc.dto.UserInsertDTO;
import br.com.ficdev.apigoc.dto.UserUpdateDTO;
import br.com.ficdev.apigoc.entities.Role;
import br.com.ficdev.apigoc.entities.Usuario;
import br.com.ficdev.apigoc.repositories.RoleRepository;
import br.com.ficdev.apigoc.repositories.UserRepository;
import br.com.ficdev.apigoc.services.exceptions.DatabaseException;
import br.com.ficdev.apigoc.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {
	
	private static Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository; 
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable pageable) {
		Page<Usuario> list = repository.findAll(pageable);
		return list.map(usuario -> new UserDTO(usuario));
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<Usuario> obj = repository.findById(id);
		Usuario entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new UserDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public Usuario findUsuarioById(Long id) {
		Optional<Usuario> obj = repository.findById(id);
		Usuario entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return entity;
	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		Usuario entity = new Usuario();
		copyDtoToEntity(dto, entity);
		entity.setSenha(passwordEncoder.encode(dto.getPassword()));
		entity = repository.save(entity);
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			Usuario entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new UserDTO(entity);
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
	
	private void copyDtoToEntity(UserDTO dto, Usuario entity) {
		entity.getPessoa().setNome(dto.getNome());
		entity.getPessoa().setEmail(dto.getEmail());
		
		entity.getRoles().clear();
		for (RoleDTO roleDto : dto.getRoles()) {
			Role role = roleRepository.getOne(roleDto.getId());
			entity.getRoles().add(role);
		}
	}

	@Override
	public UserDetails loadUserByUsername(String cpf) throws UsernameNotFoundException {
		
		Usuario usuario = repository.findByCpf(cpf);
		if (usuario == null) {
			logger.error("User not found.");
			throw new UsernameNotFoundException("CPF not found");
		}
		logger.info("User found: " + usuario.getUsername());
		return usuario;
	}
}
