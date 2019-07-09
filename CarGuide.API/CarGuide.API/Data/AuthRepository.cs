using CarGuide.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarGuide.API.Data {
    public class AuthRepository : IAuthRepository{
        private DataContext _context;
        public AuthRepository(DataContext dataContext) {
            _context = dataContext;
        }

        public async Task<User> Register(User user, string password) {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512()) {
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                passwordSalt = hmac.Key;
            }
        }

        public async Task<User> Login(string userName, string password) {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);

            if (user == null) {
                return null;
            }

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt)) {
                return null;
            }
            return user;
        }

        public bool VerifyPasswordHash(string password, byte[] userPasswordHash, byte[] userPasswordSalt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(userPasswordSalt)) {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < userPasswordHash.Length; i++) {
                    if (userPasswordHash[i] != computedHash[i]) {
                        return false;
                    }
                }
                return true;
            }
        } 

        public async Task<bool> UserExists(string userName) {
            if (await _context.Users.AnyAsync(u=>u.UserName.Equals(userName))) {
                return true;
            }
            return false;
        }
    }
}
