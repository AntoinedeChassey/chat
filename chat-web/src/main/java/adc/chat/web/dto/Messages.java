package adc.chat.web.dto;

import java.util.ArrayList;
import java.util.List;

public class Messages {

	private class Message {
		public String message;
		public String type;
		public String pseudo;
		public String date;
	}

	private List<Message> messages;

	public Messages() {
		super();
		messages = new ArrayList<>();
	}

	public void addMessage(String message, String type, String pseudo, String date) {
		Message newMessage = new Message();
		newMessage.message = message;
		newMessage.type = type;
		newMessage.pseudo = pseudo;
		newMessage.date = date;

		messages.add(newMessage);
		// Keep only 100 messages
		if (messages.size() >= 100) {
			messages = messages.subList(messages.size() - 5, messages.size());
		}
	}

	public List<Message> getMessages() {
		return messages;
	}
}
