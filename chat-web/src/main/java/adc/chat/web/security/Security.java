package adc.chat.web.security;

import java.util.regex.Pattern;

import adc.chat.web.dto.Message;

public class Security {

	public static Message sanitizeMessage(Message message) {
		Pattern p = Pattern.compile("<script[^>]*>(.*?)</script>", Pattern.DOTALL | Pattern.CASE_INSENSITIVE);
		String error = "Message has been deleted for security reasons.";
		if (message.getMessage() != null)
			message.setMessage(p.matcher(message.getMessage()).replaceAll(error));
		if (message.getType() != null)
			message.setType(p.matcher(message.getType()).replaceAll(error));
		if (message.getPseudo() != null)
			message.setPseudo(p.matcher(message.getPseudo()).replaceAll(error));
		if (message.getDate() != null)
			message.setDate(p.matcher(message.getDate()).replaceAll(error));
		return message;

		// final Pattern pattern =
		// Pattern.compile("<(\\w+)(+.+)*>((.*))</\\1>");
		// final Pattern pattern = Pattern.compile("<(\\w+)( +.+)*>*");
		// final Matcher matcher = pattern.matcher(content);
		// System.out.println(content);
		// if (matcher.find()) {
		// System.out.println("Process security...");
		// return "Message has been deleted for security reasons.";
		// } else
		// return content;
	}
}
