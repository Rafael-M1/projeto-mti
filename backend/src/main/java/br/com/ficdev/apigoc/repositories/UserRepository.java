package br.com.ficdev.apigoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.ficdev.apigoc.entities.Usuario;

@Repository
public interface UserRepository extends JpaRepository<Usuario, Long> {

	@Query(value = "SELECT u FROM Usuario u "
			+ "WHERE u.pessoa.cpf = :cpf ")
	Usuario findByCpf(String cpf);
}
