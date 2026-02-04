/** Так как в не ясно какие конкретно даты должны быть , сделал просто 30 дней */
export function generateDateOptions() {
  const today = new Date();
  const options = [];
  for (let i = 0; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const value = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
    ).toISOString();

    let label = '';
    if (i === 0) label = 'Сегодня';
    else if (i === 1) label = 'Завтра';
    else
      label = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

    options.push({ label, value });
  }
  return options;
}
