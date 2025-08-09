from backend.services.notify import send_email


def annotation_and_rubric_completed(user_email: str, annotation_id: str, context: dict | None = None) -> None:
    """Triggered when both annotation and rubric are completed."""
    context = context or {"annotation_id": annotation_id}
    send_email(user_email, "Correção concluída", "correcao_concluida.html", context)


def payment_received(user_email: str, amount: str, context: dict | None = None) -> None:
    """Triggered when a payment is received."""
    context = context or {"amount": amount}
    send_email(user_email, "Pagamento recebido", "pagamento_recebido.html", context)
