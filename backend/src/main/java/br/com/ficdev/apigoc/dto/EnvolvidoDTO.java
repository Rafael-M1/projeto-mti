package br.com.ficdev.apigoc.dto;

import java.io.Serializable;

import br.com.ficdev.apigoc.entities.Envolvido;
import br.com.ficdev.apigoc.entities.Pessoa;

public class EnvolvidoDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idEnvolvido;
	private String descricao;
	private Pessoa pessoa;
	
	public EnvolvidoDTO() {
	}
	
	public EnvolvidoDTO(Envolvido envolvido) {
		this.idEnvolvido = envolvido.getIdEnvolvido() != null ? envolvido.getIdEnvolvido() : null;
		this.descricao = envolvido.getDescricao() != null ? envolvido.getDescricao() : null;
		this.pessoa = envolvido.getPessoa() != null ? envolvido.getPessoa() : null;
	}

	public Long getIdEnvolvido() {
		return idEnvolvido;
	}

	public String getDescricao() {
		return descricao;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	@Override
	public String toString() {
		return "EnvolvidoDTO [idEnvolvido=" + idEnvolvido + ", descricao=" + descricao + ", pessoa=" + pessoa + "]";
	}
}
