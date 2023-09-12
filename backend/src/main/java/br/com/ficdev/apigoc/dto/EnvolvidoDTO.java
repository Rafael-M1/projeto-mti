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
		this.idEnvolvido = envolvido.getIdEnvolvido();
		this.descricao = envolvido.getDescricao();
		this.pessoa = envolvido.getPessoa();
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
