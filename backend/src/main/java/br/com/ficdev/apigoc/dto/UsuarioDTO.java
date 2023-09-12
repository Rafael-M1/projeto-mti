package br.com.ficdev.apigoc.dto;

import java.io.Serializable;

import br.com.ficdev.apigoc.entities.Cargo;
import br.com.ficdev.apigoc.entities.Lotacao;
import br.com.ficdev.apigoc.entities.Pessoa;
import br.com.ficdev.apigoc.entities.Usuario;

public class UsuarioDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idUser;
	private Cargo cargo;
	private Lotacao lotacao;
	private Pessoa pessoa;
	
	public UsuarioDTO() {
	}

	public UsuarioDTO(Usuario operador) {
		this.idUser = operador.getIdUser();
		this.cargo = operador.getCargo();
		this.lotacao = operador.getLotacao();
		this.pessoa = operador.getPessoa();
	}

	public Long getIdUser() {
		return idUser;
	}

	public Cargo getCargo() {
		return cargo;
	}

	public Lotacao getLotacao() {
		return lotacao;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	@Override
	public String toString() {
		return "UsuarioDTO [idUser=" + idUser + ", cargo=" + cargo + ", lotacao=" + lotacao + ", pessoa=" + pessoa
				+ "]";
	}
}
