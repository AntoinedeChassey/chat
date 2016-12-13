package adc.chat.web.provider;

import java.util.List;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import com.google.gson.Gson;

import adc.chat.web.dto.Message;

public class MessagesEncoder implements Encoder.Text<List<Message>> {

	@Override
	public String encode(List<Message> object) throws EncodeException {
		return new Gson().toJson(object);
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub

	}
}