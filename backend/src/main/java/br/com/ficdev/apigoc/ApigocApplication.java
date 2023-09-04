package br.com.ficdev.apigoc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.com.ficdev.apigoc.entities.Crime;
import br.com.ficdev.apigoc.entities.Pessoa;
import br.com.ficdev.apigoc.entities.Role;
import br.com.ficdev.apigoc.entities.Usuario;
import br.com.ficdev.apigoc.repositories.CrimeRepository;
import br.com.ficdev.apigoc.repositories.PessoaRepository;
import br.com.ficdev.apigoc.repositories.RoleRepository;
import br.com.ficdev.apigoc.repositories.UserRepository;

@SpringBootApplication
public class ApigocApplication implements CommandLineRunner {

	@Autowired
	BCryptPasswordEncoder encoder;
	
	@Autowired
	private CrimeRepository crimeRepository;
	
	@Autowired
	private UserRepository usuarioRepository;

	@Autowired
	private PessoaRepository pessoaRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(ApigocApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		crimeRepository.save(new Crime(null, "Roubo", true));
		Pessoa pessoa = new Pessoa();
		pessoa.setCpf("01234567912");
		pessoa.setEmail("rafael@gmail.com");
		pessoa.setNome("Rafael Muzzi");
		pessoa.setSexo('M');
		pessoa.setTelefone("(65)99999-1234");
		pessoaRepository.save(pessoa);
		
		Role operator = new Role(null, "ROLE_OPERATOR");
		Role admin = new Role(null, "ROLE_ADMIN");
		roleRepository.save(operator);
		roleRepository.save(admin);
		
		Usuario usuario1 = new Usuario();
		usuario1.setPessoa(pessoa);
		usuario1.setSenha("$2a$10$nOHnbXajbtcbyd5L/1A.s.tfvxO3ntfNQQJ2SQT3/Xw5DmssqPWfm");
		usuario1.getRoles().add(operator);
		usuario1.getRoles().add(admin);
		usuarioRepository.save(usuario1);
	}
}
