package adc.chat.web.provider;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import com.google.gson.Gson;

import adc.chat.web.dto.Message;

public class MessageEncoderDecoder implements Encoder.Text<Message>, Decoder.Text<Message> {

	@Override
	public String encode(Message object) throws EncodeException {
		return new Gson().toJson(object);
	}

	@Override
	public Message decode(String s) throws DecodeException {
		Gson gson = new Gson();
		return gson.fromJson(s, Message.class);
	}

	@Override
	public boolean willDecode(String s) {
		return true;
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