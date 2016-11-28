from beets.plugins import BeetsPlugin
from beets.ui import Subcommand
from beets.ui import _raw_main
from pprint import pprint
import sys
import shlex

cmdin_command = Subcommand('cmdin', help='read beet commands from stdin')
cmdin_command.parser.add_option('-e', '--end-line', type="string", help="Line to print after last line of command's output")

# pass command lines (you don't need the 'beet' part):
# ls your query
# mod artist:"The foobs" artist="The Foobs"
def do_cmdin(lib, opts, args):
    end_line = opts.end_line
    while True:
        line = sys.stdin.readline()
        if not line:
            break
        with open("/tmp/cmdin.log", "a") as tmplog:
                tmplog.write(line)
        cmdin_args = shlex.split(line, False, True) # (string, support-comments, POSIX-mode)
        _raw_main(cmdin_args, lib);
        if end_line:
            print end_line
        sys.stdout.flush()

cmdin_command.func = do_cmdin;

class cmdin(BeetsPlugin):
    def commands(self):
        return [cmdin_command]
