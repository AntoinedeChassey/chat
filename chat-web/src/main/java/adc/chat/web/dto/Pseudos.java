package adc.chat.web.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Pseudos {

	public class Pseudo {
		public String pseudo;
		public String id;
	}

	private List<Pseudo> pseudos;

	public Pseudos() {
		super();
		pseudos = new ArrayList<>();
	}

	public void addPseudo(String pseudo, String id) {
		Pseudo newPseudo = new Pseudo();
		newPseudo.pseudo = pseudo;
		newPseudo.id = id;
		pseudos.add(newPseudo);
	}

	public void setPseudo(String pseudo, String id) {
		// Remove old pseudo
		for (Pseudo p : pseudos) {
			if (p.id == id) {
				deletePseudo(id);
				break;
			}
		}
		addPseudo(pseudo, id);
	}

	public void deletePseudo(String id) {
		pseudos = pseudos.stream().filter(p -> !p.id.equals(id)).collect(Collectors.toList());
	}

	public List<Pseudo> getPseudos() {
		return pseudos;
	}

	public String getSessionId(String group) {
		for (Pseudo pseudo : pseudos) {
			if (pseudo.pseudo.equals(group)) {
				return pseudo.id;
			}
		}
		return null;
	}
}
