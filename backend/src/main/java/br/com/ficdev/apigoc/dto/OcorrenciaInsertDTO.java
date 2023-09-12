package br.com.ficdev.apigoc.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import br.com.ficdev.apigoc.entities.Pessoa;

public class OcorrenciaInsertDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private String cidade;
	private String bairro;
	private String endereco;
	private String numero;
	private String complemento;
	
	private LocalDateTime dataCriado;
	private LocalDateTime dataOcorrencia;
	private String descricaoGeral;
	private boolean status;
	
	private Pessoa vitima;
	private Long idOperador;
	
	private Set<EnvolvidoDTO> pessoasEnvolvidas = new HashSet<>();
	private Set<OcorrenciaCrimeDTO> crimesEnvolvidos = new HashSet<>();

	public OcorrenciaInsertDTO() {
	}

	public String getCidade() {
		return cidade;
	}

	public String getBairro() {
		return bairro;
	}

	public String getEndereco() {
		return endereco;
	}

	public String getNumero() {
		return numero;
	}

	public String getComplemento() {
		return complemento;
	}

	public LocalDateTime getDataCriado() {
		return dataCriado;
	}

	public LocalDateTime getDataOcorrencia() {
		return dataOcorrencia;
	}

	public String getDescricaoGeral() {
		return descricaoGeral;
	}

	public boolean isStatus() {
		return status;
	}

	public Pessoa getVitima() {
		return vitima;
	}

	public Long getIdOperador() {
		return idOperador;
	}

	public Set<EnvolvidoDTO> getPessoasEnvolvidas() {
		return pessoasEnvolvidas;
	}

	public Set<OcorrenciaCrimeDTO> getCrimesEnvolvidos() {
		return crimesEnvolvidos;
	}

	@Override
	public String toString() {
		return "OcorrenciaInsertDTO [cidade=" + cidade + ", bairro=" + bairro + ", endereco=" + endereco + ", numero="
				+ numero + ", complemento=" + complemento + ", dataCriado=" + dataCriado + ", dataOcorrencia="
				+ dataOcorrencia + ", descricaoGeral=" + descricaoGeral + ", status=" + status + ", vitima=" + vitima
				+ ", idOperador=" + idOperador + ", pessoasEnvolvidas=" + pessoasEnvolvidas + ", crimesEnvolvidos="
				+ crimesEnvolvidos + "]";
	}
}
