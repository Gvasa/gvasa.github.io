/*	this is the barrel class and all its private members */

function Barrel(_barreltype, _id, _sprite, _charge, _visible, _spriteCharge1, _spriteCharge2, _spritePosX, _spritePosY, _marking) {
	this.barrelType = _barreltype;
	this.barrelId = _id;
	this.barrelSprite = _sprite;
	this.charges = _charge;
    this.visible = _visible;
	this.chargeSprite1 = _spriteCharge1;
	this.chargeSprite2 = _spriteCharge2;
	this.spritePosX = _spritePosX;
	this.spritePosY = _spritePosY;
	this.marking = _marking;
}

Barrel.prototype.barrelInfo = function() {
	console.log("BarrelId:  " + this.barrelId + "  row:  " + "  Type: " + this.barrelType + " Charges: " + this.charges + " visible: " + this.visible);
}