"use strict";

var Errors = function () {};

Errors.http404 = function (req, res, next)
{
	var error = new Error();
	error.status = 404;

	var locals = {
		title:"ERROR 404",
		description:"RECURSO NO ENCONTRADO",
		error:error
	}

	res.send({"error": locals});
}


Errors.http401 = function (req, res, next)
{
	var error = new Error();
	error.status = 401;

	var locals = {
		title:"ERROR 401",
		description:"RECURSO NO AUTORIZADO",
		error:error
	}

	res.send({"error": locals});
}

Error.http500 = function (req, res, next)
{
	var error = new Error();
	error.status = 500;

	var locals = {
		title:"ERROR 500",
		description:"ERROR INTERNO DEL SERVIDOR",
		error:error
	};

	res.send({"error": locals});
}

module.exports = Errors;