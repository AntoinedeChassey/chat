package adc.chat.web.provider;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import adc.chat.web.dto.Pseudos;

public class PseudosEncoder implements Encoder.Text<Pseudos> {

    private ObjectMapper mapper;

    @Override
    public void init(EndpointConfig config) {
        mapper = new ObjectMapper();
    }


    @Override
    public void destroy() {
        // TODO Auto-generated method stub
    }


    @Override
    public String encode(Pseudos object) throws EncodeException {
        try {
            return mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new EncodeException(object, "nul!", e);
        }
    }
}
