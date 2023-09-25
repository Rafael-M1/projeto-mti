package br.com.ficdev.apigoc.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ficdev.apigoc.dto.UsuarioDTO;
import br.com.ficdev.apigoc.entities.Usuario;
import br.com.ficdev.apigoc.repositories.UserRepository;

@RestController
public class MeController {
	@Autowired
	private UserRepository userRepository;
	
	@Transactional
	@GetMapping("/me")
	public ResponseEntity<UsuarioDTO> getLoggedInUserInfo() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Usuario user = userRepository.findByCpf(authentication.getPrincipal().toString());
		UsuarioDTO userDTO = new UsuarioDTO(user);
		return new ResponseEntity<UsuarioDTO>(userDTO, HttpStatus.OK);
	}
}
