package br.com.ficdev.apigoc.dto;

public class MapDTO {
	private String key;
	private Long value;
	
	public MapDTO() {
	}

	public MapDTO(String key, Long value) {
		this.key = key;
		this.value = value;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public Long getValue() {
		return value;
	}

	public void setValue(Long value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return "MapDTO [key=" + key + ", value=" + value + "]";
	}
}
