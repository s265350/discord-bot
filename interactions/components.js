import { ButtonBuilder, ButtonStyle, SelectMenuBuilder, EmbedBuilder } from 'discord.js';
import { setButton, setMenu } from '../deploy-commands.js';

export function Button(id, style = ButtonStyle.Primary, 
    reply = async (i) => {return i.reply(`${i.user.username} clicked on the ${id} button`);}, 
    label = '', emoji = '', enabled = true) {

    if (label === '' && emoji !== '') return null;

    const button = new ButtonBuilder()
        .setCustomId(id)
        .setLabel(' ')
        .setStyle(style)
        .setDisabled(!enabled);
    if (label && label !== '') button.setLabel(label);
    if (emoji && emoji !== '') button.setEmoji(emoji);

    setButton(button, reply);
    return button;
}

export function LinkButton(url, label = '', emoji = '', enabled = true) {
    if (label === '' && (emoji || emoji !== '')) return null;
    const button = new ButtonBuilder()
        // Link buttons cannot have a customId and do NOT send an interaction event when clicked
        .setStyle(ButtonStyle.Link)
        .setLabel(' ')
        .setURL(url) // Only Link buttons can have a url
        .setDisabled(!enabled);
    if (label && label !== '') button.setLabel(label);
    if (emoji && emoji !== '') button.setEmoji(emoji);
    return button;
}

export function SelectMenu(id, placeHolder, 
    reply = async (i) => {return i.reply(`${i.user.username} choose an optionfromthe menu ${id}`);}, min = 1, max = 1) {

    const menu = new SelectMenuBuilder()
        .setCustomId(id)
        .setPlaceholder(placeHolder)
        .setMinValues(min)
        .setMaxValues(max)
    setMenu(menu, reply);
    return menu;
}

export function AddMenuOption(menu, label, description, value ) {
    menu.addOptions({ label: label, description: description, value: value});
}

export function Embed(title, description = '', color = 0x0099FF, url = '') {
    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setURL(url);
}
