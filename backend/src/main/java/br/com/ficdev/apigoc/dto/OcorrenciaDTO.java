package br.com.ficdev.apigoc.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import br.com.ficdev.apigoc.entities.Ocorrencia;
import br.com.ficdev.apigoc.entities.Pessoa;

public class OcorrenciaDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idOcorrencia;
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
	private UsuarioDTO operador;

	private Set<EnvolvidoDTO> pessoasEnvolvidas = new HashSet<>();
	private Set<OcorrenciaCrimeDTO> crimesEnvolvidos = new HashSet<>();

	public OcorrenciaDTO() {
	}

	public OcorrenciaDTO(Ocorrencia ocorrencia) {
		this.idOcorrencia = ocorrencia.getIdOcorrencia();
		this.cidade = ocorrencia.getCidade();
		this.bairro = ocorrencia.getBairro();
		this.endereco = ocorrencia.getEndereco();
		this.numero = ocorrencia.getNumero();
		this.complemento = ocorrencia.getComplemento();
		this.dataCriado = ocorrencia.getDataCriado();
		this.dataOcorrencia = ocorrencia.getDataOcorrencia();
		this.descricaoGeral = ocorrencia.getDescricaoGeral();
		this.status = ocorrencia.isStatus();
		this.operador = new UsuarioDTO(ocorrencia.getOperador());
		this.vitima = ocorrencia.getVitima();
		this.pessoasEnvolvidas = ocorrencia.getListaEnvolvidos() != null ? ocorrencia.getListaEnvolvidos().stream()
				.map(envolvido -> new EnvolvidoDTO(envolvido)).collect(Collectors.toSet()) : null;
		this.crimesEnvolvidos = ocorrencia.getListaOcorrenciaCrime() != null
				? ocorrencia.getListaOcorrenciaCrime().stream()
						.map(ocorrenciaCrime -> new OcorrenciaCrimeDTO(ocorrenciaCrime)).collect(Collectors.toSet())
				: null;
	}

	public Long getIdOcorrencia() {
		return idOcorrencia;
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

	public UsuarioDTO getOperador() {
		return operador;
	}

	public Set<EnvolvidoDTO> getPessoasEnvolvidas() {
		return pessoasEnvolvidas;
	}

	public Set<OcorrenciaCrimeDTO> getCrimesEnvolvidos() {
		return crimesEnvolvidos;
	}

	@Override
	public String toString() {
		return "OcorrenciaDTO [idOcorrencia=" + idOcorrencia + ", cidade=" + cidade + ", bairro=" + bairro
				+ ", endereco=" + endereco + ", numero=" + numero + ", complemento=" + complemento + ", dataCriado="
				+ dataCriado + ", dataOcorrencia=" + dataOcorrencia + ", descricaoGeral=" + descricaoGeral + ", status="
				+ status + ", vitima=" + vitima + ", operador=" + operador + ", pessoasEnvolvidas=" + pessoasEnvolvidas
				+ ", crimesEnvolvidos=" + crimesEnvolvidos + "]";
	}
}
