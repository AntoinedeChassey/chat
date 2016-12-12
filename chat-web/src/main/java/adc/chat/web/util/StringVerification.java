package adc.chat.web.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringVerification {

	public static String removeIllegal(String content) {
		// Pattern p = Pattern.compile("<script[^>]*>(.*?)</script>",
		// Pattern.DOTALL | Pattern.CASE_INSENSITIVE);

		// return p.matcher(content).replaceAll("Message has been deleted for
		// security reasons.");
		// final Pattern pattern = Pattern.compile("<(\\w+)(
		// +.+)*>((.*))</\\1>");
		final Pattern pattern = Pattern.compile("<(\\w+)( +.+)*>*");
		final Matcher matcher = pattern.matcher(content);
		if (matcher.find()) {
			return "Message has been deleted for security reasons.";
		} else
			return content;
	}
}
