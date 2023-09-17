package br.com.ficdev.apigoc.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.ficdev.apigoc.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	@Query(value = "SELECT r FROM Role r "
			+ "WHERE r.authority = :authority ")
	Optional<Role> findByNome(String authority);
}
