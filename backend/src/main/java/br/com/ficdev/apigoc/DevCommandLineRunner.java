package br.com.ficdev.apigoc;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import br.com.ficdev.apigoc.entities.Crime;
import br.com.ficdev.apigoc.entities.Envolvido;
import br.com.ficdev.apigoc.entities.Ocorrencia;
import br.com.ficdev.apigoc.entities.OcorrenciaCrime;
import br.com.ficdev.apigoc.entities.Pessoa;
import br.com.ficdev.apigoc.entities.Role;
import br.com.ficdev.apigoc.entities.Usuario;
import br.com.ficdev.apigoc.entities.compositekeys.OcorrenciaCrimeId;
import br.com.ficdev.apigoc.repositories.CrimeRepository;
import br.com.ficdev.apigoc.repositories.EnvolvidoRepository;
import br.com.ficdev.apigoc.repositories.OcorrenciaCrimeRepository;
import br.com.ficdev.apigoc.repositories.OcorrenciaRepository;
import br.com.ficdev.apigoc.repositories.PessoaRepository;
import br.com.ficdev.apigoc.repositories.RoleRepository;
import br.com.ficdev.apigoc.repositories.UserRepository;

@Component
@Profile("dev")
public class DevCommandLineRunner implements CommandLineRunner {

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

	@Autowired
	private OcorrenciaRepository ocorrenciaRepository;

	@Autowired
	private EnvolvidoRepository envolvidoRepository;

	@Autowired
	private OcorrenciaCrimeRepository ocorrenciaCrimeRepository;

	@Override
	public void run(String... args) throws Exception {
		if (roleRepository.findByNome("ROLE_OPERATOR").isEmpty()) {
			Role operator = new Role(null, "ROLE_OPERATOR");
			roleRepository.save(operator);
		}

		if (roleRepository.findByNome("ROLE_ADMIN").isEmpty()) {
			Role admin = new Role(null, "ROLE_ADMIN");
			roleRepository.save(admin);
		}

		if (usuarioRepository.findByNome("Rafael Muzzi da Silva").isEmpty()) {
			Pessoa pessoa = new Pessoa();
			pessoa.setCpf("01234567891");
			pessoa.setEmail("rafael@gmail.com");
			pessoa.setNome("Rafael Muzzi da Silva");
			pessoa.setSexo('M');
			pessoa.setTelefone1("(65)99999-1234");
			pessoa.setDataNascimento(LocalDate.of(1997, Month.JUNE, 2));
			pessoaRepository.save(pessoa);

			Usuario usuario1 = new Usuario();
			usuario1.setPessoa(pessoa);
			usuario1.setSenha("$2a$10$nOHnbXajbtcbyd5L/1A.s.tfvxO3ntfNQQJ2SQT3/Xw5DmssqPWfm");
			usuario1.getRoles().add(roleRepository.findByNome("ROLE_ADMIN").get());
			usuario1.getRoles().add(roleRepository.findByNome("ROLE_OPERATOR").get());
			usuarioRepository.save(usuario1);
		}
	}

}
