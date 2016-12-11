package adc.chat.web.provider;

import java.io.IOException;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;
import com.fasterxml.jackson.databind.ObjectMapper;

import adc.chat.web.dto.Message;

public class MessageDecoder implements Decoder.Text<Message> {

    private ObjectMapper mapper;

    @Override
    public void init(EndpointConfig config) {
        mapper = new ObjectMapper();
    }


    @Override
    public void destroy() {
    }


    @Override
    public Message decode(String s) throws DecodeException {
        try {
            return mapper.readValue(s, Message.class);
        } catch (IOException e) {
            throw new DecodeException(s, "nul!");
        }
    }


    @Override
    public boolean willDecode(String s) {
        return true;
    }
}
