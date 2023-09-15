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
@Profile("test")
public class TestCommandLineRunner implements CommandLineRunner {

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
		crimeRepository.save(new Crime(null, "Roubo", true));
		crimeRepository.save(new Crime(null, "Furto", true));
		crimeRepository.save(new Crime(null, "Homicídio", true));
		crimeRepository.save(new Crime(null, "Difamação", true));
		crimeRepository.save(new Crime(null, "Receptação", true));
		crimeRepository.save(new Crime(null, "Tráfico de Drogas", true));
		crimeRepository.save(new Crime(null, "Falsidade Ideológica", true));
		crimeRepository.save(new Crime(null, "Calúnia", true));
		crimeRepository.save(new Crime(null, "Latrocínio", true));
		crimeRepository.save(new Crime(null, "Femicídio", true));
		
		Pessoa pessoa = new Pessoa();
		pessoa.setCpf("01234567891");
		pessoa.setEmail("rafael@gmail.com");
		pessoa.setNome("Rafael Muzzi");
		pessoa.setSexo('M');
		pessoa.setTelefone("(65)99999-1234");
		pessoa.setDataNascimento(LocalDate.of(1997, Month.JUNE, 2));
		pessoaRepository.save(pessoa);
		
		Pessoa vitima = new Pessoa();
		vitima.setCpf("11122233344");
		vitima.setEmail("joao@gmail.com");
		vitima.setNome("João Silva");
		vitima.setSexo('M');
		vitima.setTelefone("(65)88888-1234");
		vitima.setDataNascimento(LocalDate.of(2000, Month.FEBRUARY, 20));
		pessoaRepository.save(vitima);
		
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
		
		Ocorrencia ocorrencia1 = new Ocorrencia(null, "Cuiabá", "Jardim Petropólis",
				"Rua 1", "dois", "Próximo a uma praça", LocalDateTime.now(),
				LocalDateTime.now().minusDays(1), "Furto de um celular",
				true, vitima, usuario1);
		ocorrenciaRepository.save(ocorrencia1);
		//Associando um envolvido a uma ocorrencia;
		Envolvido envolvido1 = new Envolvido(null, "Homem de cabelo longo, "
				+ "alto, vestia chinelo, jeans e uma regata verde", null, ocorrencia1);
		envolvidoRepository.save(envolvido1);
		//Associando OcorrenciaCrime a uma Ocorrencia;
		OcorrenciaCrime oc1 = new OcorrenciaCrime();
		OcorrenciaCrimeId oci1 = new OcorrenciaCrimeId(ocorrencia1.getIdOcorrencia(),
				crimeRepository.findById(2l).get().getIdCrime());
		oc1.setIdOcorrenciaCrime(oci1);
		oc1.setCrime(crimeRepository.findById(2l).get());
		oc1.setOcorrencia(ocorrencia1);
		oc1.setDescricaoCrimeOcorrencia("descrição adicional");
		ocorrenciaCrimeRepository.save(oc1);
		
	}

}
