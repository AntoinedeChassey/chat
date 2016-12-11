package adc.chat.web.dto;

import java.util.ArrayList;
import java.util.List;

public class Messages {

	private class Message {
		public String message;
		public String type;
		public String pseudo;
	}

	private List<Message> messages;

	public Messages() {
		super();
		messages = new ArrayList<>();
	}

	public void addMessage(String message, String type, String pseudo) {
		Message newMessage = new Message();
		newMessage.message = message;
		newMessage.type = type;
		newMessage.pseudo = pseudo;
		messages.add(newMessage);
	}

	public List<Message> getMessages() {
		return messages;
	}
}
