package adc.chat.web.controller;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import adc.chat.web.dto.Message;
import adc.chat.web.dto.Messages;
import adc.chat.web.dto.Pseudos;
import adc.chat.web.provider.MessageDecoder;
import adc.chat.web.provider.MessageEncoder;
import adc.chat.web.provider.MessagesEncoder;
import adc.chat.web.provider.PseudosEncoder;

/**
 * https://netbeans.org/kb/docs/javaee/maven-websocketapi.html
 * 
 * @author Antoine
 *
 */
@ServerEndpoint(value = "/control", encoders = { MessageEncoder.class, PseudosEncoder.class,
		MessagesEncoder.class }, decoders = MessageDecoder.class)
public class ChatController {

	private static Set<Session> sessions = Collections.synchronizedSet(new HashSet<Session>());

	private static Pseudos pseudos = new Pseudos();
	private static Messages messages = new Messages();

	Pattern pattern = Pattern.compile("@\\w+");

	@OnOpen
	public void onOpen(Session s) {
		sessions.add(s);
	}

	@OnClose
	public void close(Session s) {
		sessions.remove(s);
		pseudos.deletePseudo(s.getId());
		broadcast(pseudos, s);
	}

	@OnMessage
	public void message(Message message, Session s) throws IOException, EncodeException {
		// At first connection
		if (message.getType().equals("connect")) {
			Message welcomeMessage = new Message();
			welcomeMessage.setMessage("Bienvenue dans le chat <b>" + message.getPseudo() + "</b>!");
			welcomeMessage.setType("welcome");
			welcomeMessage.setPseudo("Admin");
			s.getBasicRemote().sendObject(welcomeMessage);
			s.getBasicRemote().sendObject(messages);

			pseudos.addPseudo(message.getPseudo(), s.getId());
			broadcast(pseudos, s);
		} else if (message.getType().equals("message")) {
			// Show message only for the id of the user connected
			// Matcher matcher = pattern.matcher(message.getMessage());
			// boolean matched = false;
			// while (matcher.find()) {
			// matched = true;
			// String sessionId =
			// pseudos.getSessionId(matcher.group().substring(1));
			// if (sessionId != null) {
			// for (Session session : s.getOpenSessions()) {
			// if (session.getId().equals(sessionId)) {
			// session.getBasicRemote().sendObject(message);
			// }
			// }
			// }
			messages.addMessage(message.getMessage(), message.getType(), message.getPseudo());
			broadcast(message, s);
		}
		// if (!matched) {
		// messages.addMessage(message.getMessage(), message.getType(),
		// message.getPseudo());
		// broadcast(message, s);
		// }
		// }
	}

	@OnError
	public void onError(Throwable t) {
		t.printStackTrace();
	}

	private void broadcast(Object objet, Session s) {
//		Set<Session> sessionsOuvertes = s.getOpenSessions();
//		System.out.println("Nombre de sessions: " + sessions.size());
		for (Session session : sessions) {
			if (session.isOpen()) {
				try {
					session.getBasicRemote().sendObject(objet);
				} catch (IOException | EncodeException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
