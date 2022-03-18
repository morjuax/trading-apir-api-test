export function getNonce(): string {
  return (Date.now() * 1000).toString();
}

function RouteTable(
  stack: { method: string },
  item: { route: { path: string } },
): void {
  this.method = stack.method.toUpperCase();
  this.route = item.route.path;
}

export function tableLogRoutes(server: any, prefix: string = ''): void {
  const resp = [];
  server._events.request._router.stack.forEach((item) => {
    if (item.route && item.route.path.includes(prefix + '/')) {
      item.route.stack.forEach((stack) => {
        resp.push(new RouteTable(stack, item));
      });
    }
  });
  console.log('\x1b[39m'); // white
  console.table(resp);
}
