package adc.chat.web.dto;

public class Message {

    private String message;
    private String type;
    private String pseudo;


    public String getMessage() {
        return message;
    }


    public void setMessage(String message) {
        this.message = message;
    }


    public String getType() {
        return type;
    }


    public void setType(String type) {
        this.type = type;
    }


    public String getPseudo() {
        return pseudo;
    }


    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }
}
